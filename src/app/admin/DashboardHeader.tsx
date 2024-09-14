'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import profilePic from "../../../public/assets/avatar.jpg";
import HeaderNotificationCard from './HeaderNotification';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import SearchBar from '@/components/Search';

const DashboardHeader = ({ isPanelHovered, onShowNotifications, showNotifications, onShowDropdown, showDropdown }: any) => {
  const [notifications] = useState([
    {
      title: 'Shankar Sharma as Doctor',
      description: 'is Now Registered on Phoenix and Approved by Jay Rawat',
      image: '/assets/avatar.jpg',
      isRead: false,
    },
    {
      title: 'Smriti Sharma as Doctor',
      description: 'on 60 character break the content and need show .............',
      image: '/assets/avatar.jpg',
      isRead: false,
    },
    {
      title: 'Shankar Sharma as Doctor',
      description: 'on 60 character break the content and need show .............',
      image: '/assets/avatar.jpg',
      isRead: false,
    },
    {
      title: 'Smriti Sharma as Doctor',
      description: 'on 60 character break the content and need show .............',
      image: '/assets/avatar.jpg',
      isRead: true,
    },
  ]);

  const notificationsCount = notifications.length;

  const [showCard, setShowCard] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);



  const handleButtonClick = () => {
    setShowCard(!showCard);
  };

  const handleNotificationClick = () => {
    onShowNotifications(!showNotifications);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;

    if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
      setShowCard(false);
    }
    if (notificationRef.current && target && !notificationRef.current.contains(target)) {
      onShowNotifications(false);
    }
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <Navbar bg='transparent' className="d-flex justify-content-between w-100 p-3 header bg-white">
      <div style={{ marginLeft: '7.5%' }}>
        <SearchBar onSearch={handleSearch} />

      </div>
      <div className="d-flex align-items-center">
        <div ref={notificationRef} style={{ position: 'relative', marginRight: '10px' }}>
          <FaBell
            size={40}
            style={{ color: '#000', background: "#fff", borderRadius: '10px', padding: "10px", cursor: 'pointer' }}
            onClick={handleNotificationClick}
          />
          {notificationsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ff6600',
              borderRadius: '50%',
              color: '#fff',
              padding: '1px 5px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>{notificationsCount}</span>
          )}
          {showNotifications && (
            <div className="notifications-dropdown">
              <HeaderNotificationCard title="Notifications" notifications={notifications} />
            </div>
          )}
        </div>
        <div ref={dropdownRef} className="d-flex align-items-center bg-white p-1" style={{ borderRadius: "10px", cursor: "pointer" }} onClick={handleButtonClick}>
          <Image
            src={profilePic}
            alt="Profile"
            width={40}
            height={40}
            className=""
            style={{ marginRight: '10px', borderRadius: "10px" }}
          />
          <span className="mx-1" style={{ color: '#000', fontWeight: 'bold' }}>Shubham</span>
          <div className="relative"  >
            {/* Button with Dropdown Icon */}
            <button

              className="rounded-full flex items-center"
            >
              <ChevronDownIcon />
            </button>

            {/* Dropdown Card */}
            {showCard && (
              <div className="custom-dropdown dropdown-card absolute top-8 right-5 mt-2 bg-white shadow-lg rounded-lg z-10">
                <Link href="/profile" className="dropdown-item  py-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M21.3462 13.8462C21.3462 15.1013 20.974 16.3283 20.2766 17.3719C19.5793 18.4155 18.5882 19.2289 17.4286 19.7092C16.269 20.1896 14.993 20.3152 13.7619 20.0704C12.5309 19.8255 11.4001 19.2211 10.5126 18.3336C9.62507 17.446 9.02066 16.3153 8.77579 15.0842C8.53092 13.8532 8.6566 12.5772 9.13692 11.4176C9.61725 10.258 10.4307 9.26684 11.4743 8.56952C12.5179 7.87219 13.7449 7.5 15 7.5C16.6825 7.50191 18.2956 8.17113 19.4853 9.36085C20.675 10.5506 21.3442 12.1636 21.3462 13.8462ZM30 15C30 17.9667 29.1203 20.8668 27.472 23.3335C25.8238 25.8003 23.4811 27.7229 20.7403 28.8582C17.9994 29.9935 14.9834 30.2906 12.0736 29.7118C9.16393 29.133 6.49119 27.7044 4.3934 25.6066C2.29562 23.5088 0.867006 20.8361 0.288227 17.9264C-0.290551 15.0166 0.00649927 12.0006 1.14181 9.25975C2.27713 6.51886 4.19971 4.17618 6.66645 2.52796C9.13319 0.879735 12.0333 0 15 0C18.977 0.00419974 22.7898 1.5859 25.602 4.39804C28.4141 7.21017 29.9958 11.023 30 15ZM27.6923 15C27.6905 13.2916 27.3441 11.6012 26.674 10.0297C26.0038 8.45831 25.0236 7.03816 23.792 5.85423C22.5604 4.6703 21.1027 3.74691 19.5061 3.13927C17.9094 2.53163 16.2066 2.25224 14.4995 2.31779C7.70625 2.58029 2.28895 8.23846 2.3077 15.0361C2.31421 18.1306 3.45552 21.1152 5.51539 23.4245C6.35427 22.2078 7.41987 21.1642 8.65385 20.351C8.75906 20.2815 8.88413 20.2484 9.00994 20.2567C9.13575 20.265 9.25536 20.3144 9.35049 20.3971C10.9185 21.7534 12.9225 22.4998 14.9957 22.4998C17.0689 22.4998 19.0728 21.7534 20.6409 20.3971C20.736 20.3144 20.8556 20.265 20.9814 20.2567C21.1072 20.2484 21.2323 20.2815 21.3375 20.351C22.573 21.1638 23.6401 22.2074 24.4803 23.4245C26.5503 21.1068 27.6939 18.1076 27.6923 15Z" fill="#FFA05D" />
                  </svg> <span className='ml-3'>My Profile</span>
                </Link>
                <Link href="/settings" className="dropdown-item py-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M17.6344 1.96875C16.86 -0.65625 13.14 -0.65625 12.3656 1.96875L12.1781 2.60625C12.0624 2.99924 11.8602 3.36135 11.5864 3.66602C11.3125 3.9707 10.9739 4.21021 10.5954 4.36699C10.2169 4.52378 9.80818 4.59386 9.39909 4.57211C8.99 4.55035 8.59096 4.4373 8.23125 4.24125L7.65 3.9225C5.24437 2.61375 2.61375 5.24438 3.92437 7.64813L4.24125 8.23125C5.0775 9.76875 4.28437 11.6831 2.60625 12.1781L1.96875 12.3656C-0.65625 13.14 -0.65625 16.86 1.96875 17.6344L2.60625 17.8219C2.99924 17.9376 3.36135 18.1398 3.66602 18.4136C3.9707 18.6875 4.21021 19.0261 4.36699 19.4046C4.52378 19.7831 4.59386 20.1918 4.57211 20.6009C4.55035 21.01 4.4373 21.409 4.24125 21.7687L3.9225 22.35C2.61375 24.7556 5.24438 27.3862 7.64813 26.0756L8.23125 25.7587C8.59096 25.5627 8.99 25.4497 9.39909 25.4279C9.80818 25.4061 10.2169 25.4762 10.5954 25.633C10.9739 25.7898 11.3125 26.0293 11.5864 26.334C11.8602 26.6387 12.0624 27.0008 12.1781 27.3937L12.3656 28.0312C13.14 30.6562 16.86 30.6562 17.6344 28.0312L17.8219 27.3937C17.9376 27.0008 18.1398 26.6387 18.4136 26.334C18.6875 26.0293 19.0261 25.7898 19.4046 25.633C19.7831 25.4762 20.1918 25.4061 20.6009 25.4279C21.01 25.4497 21.409 25.5627 21.7687 25.7587L22.35 26.0775C24.7556 27.3862 27.3862 24.7556 26.0756 22.3519L25.7587 21.7687C25.5627 21.409 25.4497 21.01 25.4279 20.6009C25.4061 20.1918 25.4762 19.7831 25.633 19.4046C25.7898 19.0261 26.0293 18.6875 26.334 18.4136C26.6387 18.1398 27.0008 17.9376 27.3937 17.8219L28.0312 17.6344C30.6562 16.86 30.6562 13.14 28.0312 12.3656L27.3937 12.1781C27.0008 12.0624 26.6387 11.8602 26.334 11.5864C26.0293 11.3125 25.7898 10.9739 25.633 10.5954C25.4762 10.2169 25.4061 9.80818 25.4279 9.39909C25.4497 8.99 25.5627 8.59096 25.7587 8.23125L26.0775 7.65C27.3862 5.24437 24.7556 2.61375 22.3519 3.92437L21.7687 4.24125C21.409 4.4373 21.01 4.55035 20.6009 4.57211C20.1918 4.59386 19.7831 4.52378 19.4046 4.36699C19.0261 4.21021 18.6875 3.9707 18.4136 3.66602C18.1398 3.36135 17.9376 2.99924 17.8219 2.60625L17.6344 1.96875ZM15 20.4938C13.543 20.4938 12.1456 19.9149 11.1153 18.8847C10.0851 17.8544 9.50625 16.457 9.50625 15C9.50625 13.543 10.0851 12.1456 11.1153 11.1153C12.1456 10.0851 13.543 9.50625 15 9.50625C16.4565 9.50625 17.8534 10.0849 18.8833 11.1148C19.9133 12.1447 20.4919 13.5416 20.4919 14.9981C20.4919 16.4547 19.9133 17.8515 18.8833 18.8815C17.8534 19.9114 16.4565 20.49 15 20.49V20.4938Z" fill="#FFA05D" />
                  </svg><span className='ml-3'>Settings</span>
                </Link>
                <Link href="/logout" className="dropdown-item py-2 px-3">
                  <svg style={{ marginLeft: "5px" }} xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
                    <path d="M8.07707 13C8.07707 12.6866 8.19864 12.386 8.41503 12.1643C8.63142 11.9427 8.92491 11.8182 9.23093 11.8182H19.6157V4.13636C19.6157 1.77273 17.1789 0 15.0003 0H4.03853C2.9678 0.00117312 1.94125 0.437344 1.18412 1.21281C0.427 1.98827 0.00114538 3.03969 0 4.13636V21.8636C0.00114538 22.9603 0.427 24.0117 1.18412 24.7872C1.94125 25.5627 2.9678 25.9988 4.03853 26H15.5772C16.6479 25.9988 17.6745 25.5627 18.4316 24.7872C19.1887 24.0117 19.6146 22.9603 19.6157 21.8636V14.1818H9.23093C8.92491 14.1818 8.63142 14.0573 8.41503 13.8357C8.19864 13.614 8.07707 13.3134 8.07707 13ZM29.6623 12.1646L23.893 6.25551C23.6748 6.04323 23.3843 5.92664 23.0835 5.93058C22.7826 5.93453 22.4951 6.0587 22.2823 6.27663C22.0695 6.49456 21.9483 6.789 21.9444 7.09718C21.9406 7.40535 22.0544 7.70287 22.2617 7.92631L26.0608 11.8182H19.6157V14.1818H26.0608L22.2617 18.0737C22.15 18.1823 22.0607 18.3128 21.9991 18.4573C21.9374 18.6019 21.9046 18.7576 21.9027 18.9154C21.9007 19.0731 21.9296 19.2296 21.9876 19.3758C22.0456 19.5219 22.1316 19.6546 22.2405 19.7662C22.3494 19.8777 22.479 19.9658 22.6217 20.0252C22.7644 20.0846 22.9172 20.1142 23.0712 20.1122C23.2252 20.1102 23.3773 20.0766 23.5184 20.0135C23.6595 19.9503 23.7869 19.8589 23.893 19.7445L29.6623 13.8354C29.8785 13.6138 30 13.3133 30 13C30 12.6867 29.8785 12.3862 29.6623 12.1646Z" fill="#FFA05D" />
                  </svg> <span className='ml-3'>Logout</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardHeader;