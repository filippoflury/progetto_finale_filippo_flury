export default function Footer() {
  return (
    <footer className="bg-base-200 p-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
        <div>
          <strong className="text-base-content">🎮 Gamer's Den</strong> — All rights reserved &copy; {new Date().getFullYear()}
        </div>

        {/* <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div> */}
      </div>
    </footer>
  );
}