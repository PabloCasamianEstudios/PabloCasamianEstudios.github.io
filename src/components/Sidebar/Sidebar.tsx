import ProfileCard from './ProfileCard';
import LocationCard from './LocationCard';
import ContactCard from './ContactCard';
import './Sidebar.scss';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ProfileCard />
            <LocationCard />
            <ContactCard />
        </aside>
    );
}
