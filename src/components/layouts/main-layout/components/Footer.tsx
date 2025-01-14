function Footer() {
  return (
    <footer className="flex items-center justify-center bg-white py-10 border-t border-black">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-sm mr-1">
          Copywrite
          &copy;
          <span className="text-xs mx-1">
            QUIZ APP
          </span>
          2024
        </span>
        {/* text-sky-100/60 */}
        <span className="text-xs mr-1">
          by Daniel Maramba
        </span>
      </div>
    </footer>
  );
}

export default Footer;
