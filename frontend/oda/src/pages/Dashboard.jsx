import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TabCreate from '../components/TabCreate';
import TabToDo from '../components/TabToDo';

function DashBoard() {
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(true);

    const logout = () => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      navigate('/');
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const toggleSidebar = () => {
      setOpen(!open);
    };

    return (
      <div className="bg-black min-h-screen text-black flex" style={{ position: 'relative' }}>
        <TabContext value={value}>
          
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, backgroundColor: '#080808', borderBottom: '1px solid #333',display: 'flex', alignItems: 'center', height: 64, px: 2}}>
              {!open && (

                <button onClick={toggleSidebar} style={{  backgroundColor: 'transparent', border: 'none',  cursor: 'pointer', marginRight: 16}} title="Open sidebar">
                  <MenuIcon sx={{ color: 'white', fontSize: 35 }} />
                </button>
              )}
            
            <Box sx={{ flexGrow: 1 }} />

            <button onClick={logout} className="px-4 py-2 rounded hover:bg-red-500" title="Logout">
              <LogoutIcon sx={{ fontSize: 35 , color:'white' }} />
            </button>
              
            <button className="px-4 py-2 rounded hover:bg-blue-500" title="Account">
              <AccountCircleIcon sx={{ fontSize: 35, color: 'whitesmoke' }} />
            </button>

          </Box>


          <Box sx={{ display: 'flex', flexGrow: 1 }}>

                        
            <Box sx={{  width: open ? 100 : 0, overflow: 'hidden', transition: 'width 0.3s ease', borderRight: open ? 1 : 0, borderColor: 'divider', display: 'flex', flexDirection: 'column',  alignItems: 'center',  backgroundColor: '#080808', py: 2,  minHeight: 'calc(100vh - 64px)', gap: 2, position: 'sticky',top: 64, alignSelf: 'flex-start'}}>
              
              {open ? (
               
                <>
                  <button onClick={toggleSidebar} className="mb-2 hover:text-blue-400 text-white" title="Close sidebar">
                    <ChevronLeftIcon />
                  </button>

                  <div className="py-1"></div>
                                    
                  <TabList orientation="vertical" onChange={handleChange} aria-label="Vertical icon tabs" sx={{ '& .MuiTab-root': { minWidth: 0, padding: '12px', color: 'white' }, '& .Mui-selected': { color: '#6495ED' } }}>
                   
                    <Tab icon={<FormatListBulletedIcon sx={{ fontSize: 35 }} />} title='view tasks' value="1" />
                    <div className="py-5"></div>
                    
                    <Tab icon={<FormatListBulletedAddIcon sx={{ fontSize: 35 }} />} title='add tasks' value="2" />
                    <div className="py-5"></div>
                    
                    <Tab icon={<ChecklistRtlIcon sx={{ fontSize: 35 }} />} title='status tasks' value="3" />
                    <div className="py-5"></div>
                    
                    <Tab icon={<PersonAddIcon sx={{ fontSize: 35 }} />} title='status tasks' value="4" />
                    <div className="py-5"></div>
                    
                    <Tab icon={<ShareIcon sx={{ fontSize: 35 }} />} title='status tasks' value="5" />
                    <div className="py-5"></div>

                  </TabList>

                </>
                
              ) : null}
            
            </Box>

            {/* Pannelli Contenuto */}

            <Box sx={{flexGrow: 1,  p: 0,overflowY: 'auto', height: 'calc(100vh - 64px)'}}>
              
              <TabPanel value="1" sx={{ p: 0 }}>

                <div className='text-5xl md:text-6xl text-center py-6 font-extralight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide'>OVERVIEW</div>

                <TabToDo/>
              
              </TabPanel>

              <TabPanel value="2" sx={{ p: 0 }}>
               
                <TabCreate/>
              
              </TabPanel>

              <TabPanel value="3" sx={{ p: 0 }}>
              
                Contenuto 3
              
              </TabPanel>

              <TabPanel value="4" sx={{ p: 0 }}>
              
                Contenuto 4
              
              </TabPanel>


              <TabPanel value="5" sx={{ p: 0 }}>
              
                Contenuto 4
              
              </TabPanel>



            
            </Box>

          </Box>
        
        </Box>
      
      </TabContext>
    
    </div>
  );
}

export default DashBoard;