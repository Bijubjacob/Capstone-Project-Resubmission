import styles from "./DashboardNav.module.css";

const DashboardNav = ({ activeSection, setActiveSection }) => {
    const navItems = [
        { id: "profile", label: "Profile", icon: "👤" },
        { id: "projects", label: "Projects", icon: "📁" },
        { id: "settings", label: "Settings", icon: "⚙️" },
    ];

    return (
        <nav className={styles.dashboardNav}>
            <div className={styles.logo}>
                <h2>ShootPro24</h2>
            </div>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            className={`${styles.navButton} ${activeSection === item.id ? styles.active : ""}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DashboardNav;
