import { company } from "../data/content.js";

const styles = String.raw`
.wa-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 70;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 28px rgba(37, 211, 102, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.wa-fab:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 14px 34px rgba(37, 211, 102, 0.55);
}
.wa-fab::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  opacity: 0.55;
  animation: wa-pulse 2.2s ease-out infinite;
  z-index: -1;
}
@keyframes wa-pulse {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.7); opacity: 0; }
}
@media (max-width: 640px) {
  .wa-fab { right: 16px; bottom: 16px; width: 52px; height: 52px; }
}
@media (prefers-reduced-motion: reduce) {
  .wa-fab::before { animation: none; }
}
`;

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.15.19 2.06 3.14 4.98 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"/>
    <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.55 22 22.02 17.52 22.02 12S17.55 2 12.02 2zm0 18.2c-1.7 0-3.28-.5-4.62-1.35l-.33-.2-3 .79.8-2.93-.21-.3A8.18 8.18 0 0 1 3.82 12c0-4.53 3.68-8.2 8.2-8.2 4.53 0 8.2 3.67 8.2 8.2 0 4.53-3.67 8.2-8.2 8.2z"/>
  </svg>
);

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    `Hi ${company.name}, I'd like to know more about your machines.`
  );
  const href = `https://wa.me/${company.whatsapp}?text=${message}`;

  return (
    <>
      <style>{styles}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}