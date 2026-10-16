import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile, writeFile, access, mkdir } from "fs/promises";

// --- process-level safety nets ---
// If something throws outside any route's try/catch (a bug, a bad dependency,
// anything), these stop the WHOLE server from crashing and killing every
// in-flight request with an empty response. We just log it and keep running.
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught exception (server stayed alive):", err);
});
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled promise rejection (server stayed alive):", err);
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// Load server/.env no matter which folder the server is started from
// (on Hostinger, real environment variables set in hPanel take priority).
dotenv.config({ path: join(__dirname, ".env") });
const DATA_DIR = join(__dirname, "data");
const QUOTES_FILE = join(DATA_DIR, "quotes.json");
const CONTACTS_FILE = join(DATA_DIR, "contacts.json");
const PORT = process.env.PORT || 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.use(cors());
app.use(express.json());

// If a request body isn't valid JSON, express.json() throws synchronously.
// Without this handler, Express's default error page (HTML, not JSON) would
// be sent instead — which is exactly what causes "Unexpected end of JSON
// input" on the frontend. Catch it here and always respond with JSON.
app.use((err, _req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, error: "Invalid request format." });
  }
  next(err);
});

// --- generic file-based "storage" (no database) ---
async function readEntries(file) {
  try {
    await access(file);
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

async function appendEntry(file, entry) {
  await mkdir(DATA_DIR, { recursive: true });
  const entries = await readEntries(file);
  entries.push(entry);
  await writeFile(file, JSON.stringify(entries, null, 2));
}

// --- shared Nodemailer transporter ---
let transporter = null;
let mailConfigured = false;

function buildTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function initMail() {
  transporter = buildTransporter();
  if (!transporter) {
    console.warn(
      "\n⚠️  Email is NOT configured — submissions will still save to disk, but no email will be sent."
    );
    console.warn(
      "   Set SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally MAIL_TO) in server/.env — see .env.example.\n"
    );
    return;
  }
  try {
    await transporter.verify();
    mailConfigured = true;
    console.log(`✅ Email is configured and verified (sending as ${process.env.SMTP_USER}).`);
  } catch (e) {
    mailConfigured = false;
    console.error(
      "\n❌ Email credentials were found but verification failed:",
      e.message
    );
    console.error(
      "   For Gmail: make sure 2-Step Verification is on and SMTP_PASS is a 16-character App Password, not your normal password.\n"
    );
  }
}

async function sendMail({ subject, text, replyTo }) {
  if (!transporter) return false;

  const { SMTP_USER, MAIL_TO } = process.env;
  await transporter.sendMail({
    from: `"Newmax Website" <${SMTP_USER}>`,
    to: MAIL_TO || "newmaxinquiry@gmail.com",
    replyTo,
    subject,
    text,
  });
  return true;
}

// --- Quote form ---
app.post("/api/quote", async (req, res) => {
  const { name, email, phone, product, message } = req.body || {};

  if (!name || !email || !product) {
    return res
      .status(400)
      .json({ ok: false, error: "Name, email, and product are required." });
  }
  if (!EMAIL_RE.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone || "").trim(),
    product: String(product).trim(),
    message: String(message || "").trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await appendEntry(QUOTES_FILE, entry);
    let emailed = false;
    try {
      emailed = await sendMail({
        subject: `Quote request: ${entry.product} — ${entry.name}`,
        replyTo: entry.email,
        text:
          `Name: ${entry.name}\n` +
          `Email: ${entry.email}\n` +
          `Phone: ${entry.phone}\n` +
          `Product: ${entry.product}\n` +
          `Message: ${entry.message}\n` +
          `Received: ${entry.receivedAt}`,
      });
    } catch (e) {
      console.error("Email failed (submission still saved):", e.message);
    }
    res.json({ ok: true, emailed });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Could not save your request." });
  }
});

// --- Contact form ---
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Name, email, and message are required." });
  }
  if (!EMAIL_RE.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone || "").trim(),
    subject: String(subject || "General enquiry").trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await appendEntry(CONTACTS_FILE, entry);
    let emailed = false;
    try {
      emailed = await sendMail({
        subject: `Website contact: ${entry.subject} — ${entry.name}`,
        replyTo: entry.email,
        text:
          `Name: ${entry.name}\n` +
          `Email: ${entry.email}\n` +
          `Phone: ${entry.phone}\n` +
          `Subject: ${entry.subject}\n\n` +
          `Message:\n${entry.message}\n\n` +
          `Received: ${entry.receivedAt}`,
      });
    } catch (e) {
      console.error("Email failed (submission still saved):", e.message);
    }
    res.json({ ok: true, emailed });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Could not save your message." });
  }
});

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, mailConfigured })
);

// serve built client if present
const clientDist = join(__dirname, "dist");
app.use(express.static(clientDist));
app.get("*", (_req, res, next) => {
  res.sendFile(join(clientDist, "index.html"), (err) => err && next());
});

initMail().finally(() => {
  // Final safety net: catches anything that still slipped through every
  // route's own try/catch, so the client NEVER receives an empty/non-JSON
  // 500 response again.
  app.use((err, _req, res, _next) => {
    console.error("❌ Unhandled route error:", err);
    if (res.headersSent) return;
    res.status(500).json({ ok: false, error: "Something went wrong on our end. Please try again." });
  });

  app.listen(PORT, () =>
    console.log(`Newmax server running on http://localhost:${PORT}`)
  );
});