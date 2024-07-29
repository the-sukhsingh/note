"use client"
import { useState, useEffect } from 'react';
import Structure from '@/public/structure.json';
const FileExplorer = ({params}) => {
  const [data, setData] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);

  useEffect(() => {
    setData(Structure)
    // const fetchData = async () => {
    //     const response = await fetch('mongodb://localhost:27017/Folder');
    //     const data = await response.json();
    //     console.log(data)
    //     }
    // fetchData();
  }, []);

// create a usesta

  const navigateTo = (path) => {
    setCurrentPath(path);
  };

  const getCurrentFolder = () => {
    let folder = data;
    currentPath.forEach((part) => {
      folder = folder.children.find(item => item.name === part);
    });
    return folder;
  };

  if (!data) return <div>Loading...</div>;

  const currentFolder = getCurrentFolder();

  return (
    <div>
      <div>
        {currentPath.length > 0 ? (
          <button onClick={() => navigateTo(currentPath.slice(0, -1))} className='bg-green-400 p-2 text-xl rounded-md mt-3 ml-5'>
            Back
          </button>
        ):<button onClick={()=>{window.history.back()}} className='bg-green-400 p-2 text-xl rounded-md mt-3 ml-5'> Subjects
            </button>}
        {currentFolder.children.map(item => (
          <div key={item.name}>
            {item.type === 'folder' ? (
              <div onClick={() => navigateTo([...currentPath, item.name])} className='bg-slate-300 p-3 my-2 rounded-xl w-4/5 mx-auto cursor-pointer text-2xl font-semibold'>
                📁 {item.name}
              </div>
            ) : (
                <div className='bg-slate-400 p-3 my-2 rounded-xl w-4/5 mx-auto cursor-pointer text-2xl font-semibold'>
                📄 <a href={item.url} target="_blank">{item.name}</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
