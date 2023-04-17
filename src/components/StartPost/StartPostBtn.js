import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { createPost } from '../../firebase';

const modalBackgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1000,
};

const discoverBtnStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#6B7280',
  color: 'white',
  cursor: 'pointer',
  transition: '0.3s',
};

const StartPostBtn = () => {
  const [isPostInput, setIsPostInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const user = useSelector((state) => state.auth.user);

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#4B5563';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#6B7280';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue !== '') {
      const att = {
        username: user.username,
        name: user.companyname,
        email: user.email,
        likes: [],
        comments: [],
        data: inputValue,
        time: Date.now(),
        type: 1,
      };
      await createPost(user.uid, att);
      setInputValue('');
      setIsPostInput(false);
    }
  };
  return ReactDOM.createPortal(
    <div style={modalBackgroundStyle}>
      {!isPostInput ? (
        <button
          onClick={() => setIsPostInput(true)}
          style={discoverBtnStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Let's Create Your First Post!
        </button>
      ) : (
        <div className='p-4 bg-white flex flex-col rounded-lg gap-y-3 w-1/3'>
          <div className=' flex gap-x-3 '>
            <Avatar src={user?.ProfileUrl} />
            <div>
              <p className=' text-lg font-medium'>{user?.companyname}</p>
              <h3 className='text-xs'>{user?.email}</h3>
            </div>
          </div>
          <div className='flex gap-x-4'>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-1'>
              <input
                className='w-full rounded-full border pl-5 h-10'
                type='text'
                placeholder='Start a post'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default StartPostBtn;
