import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'text-white font-bold' 
          : 'text-gray-400 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

const ContextMenu = ({ x, y, playlist, onClose, onDelete }) => {
  const canBeDeleted = playlist.id !== 'watchlist';

  return (
    <div
      className="absolute z-[100] w-44 bg-gray-900 rounded-md shadow-2xl border border-gray-700 p-1"
      style={{ top: y, left: x }}
    >
      {canBeDeleted && (
        <button
          onClick={() => {
            onDelete(playlist.id);
            onClose();
          }}
          className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-colors"
        >
          Delete
        </button>
      )}
    </div>
  );
};

const Navigation = ({ playlists, onDeletePlaylist }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const myListsRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    playlist: null,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        myListsRef.current &&
        !myListsRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClick = () => setContextMenu({ ...contextMenu, isOpen: false });
    const handleEsc = (e) => e.key === 'Escape' && setContextMenu({ ...contextMenu, isOpen: false });
    
    if (contextMenu.isOpen) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [contextMenu]);
  
  const handleContextMenu = (event, playlist) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      x: event.pageX,
      y: event.pageY,
      playlist: playlist,
    });
  };

  return (
    <>
      <nav className="flex items-center space-x-4">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/movies">Movies</NavItem>
        <NavItem to="/tv-shows">TV Shows</NavItem>
        <div className="relative">
          <button
            ref={myListsRef}
            onClick={() => setDropdownOpen(v => !v)}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            My List
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-50 p-2"
            >
              {playlists.map(playlist => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  onClick={() => setDropdownOpen(false)}
                  onContextMenu={(e) => handleContextMenu(e, playlist)}
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-orange-500 hover:text-white rounded-md"
                >
                  {playlist.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          playlist={contextMenu.playlist}
          onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
          onDelete={onDeletePlaylist}
        />
      )}
    </>
  );
};

export default Navigation;