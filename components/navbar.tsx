import { ModeToggle } from "./theme-toggle-button";
export const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">RBEvents</h1>
      <ModeToggle />
    </div>
  );
};
