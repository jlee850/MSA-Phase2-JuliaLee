export default function NavigationBar() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <a href="/breakfast">Breakfast</a>
        </li>
        <li>
          <a href="/lunch">Lunch</a>
        </li>
        <li>
          <a href="/dinner">Dinner</a>
        </li>
        <input
          id="searchbar"
          aria-label="Search"
          placeholder="Search"
          type="text"
          name="search"
        />
      </ul>
    </nav>
  );
}
