import { motion } from 'framer-motion';
import { User, Ticket, Settings, LogOut } from 'lucide-react';

const ProfileDropdown = ({ isDesktop }) => {
  const menuItems = [
    { icon: User, label: 'Profile', href: '#' },
    { icon: Ticket, label: 'My Tickets', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: LogOut, label: 'Logout', href: '#' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-surface-800 shadow-lg rounded-lg border border-surface-200 dark:border-surface-700 ${
        isDesktop 
          ? 'absolute right-0 top-full mt-2 w-48 z-50' 
          : 'w-full mt-2'
      }`}
    >
      <div className="py-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-surface-800 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <item.icon className="h-4 w-4 mr-2 text-surface-600 dark:text-surface-400" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;