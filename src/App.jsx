
import './App.css'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase"
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, open, onClose } = useDisclose();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        })

      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    console.log(value);
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContact = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      )
      setContacts(filteredContact);
      return filteredContact;
    })
  }

  return (
    <>
      <div className='max-w-[370px] mx-auto px-4'>
        <Navbar />
        <div className="flex gap-2">
          <div className='  flex flex-grow relative items-center'>
            <FiSearch className='ml-2 absolute text-2xl text-white' />
            <input onChange={(e) => filterContacts(e)} type="text" className='text-white pl-9 flex-grow border bg-transparent border-white rounded h-10' />
          </div>
          <AiFillPlusCircle onClick={isOpen} className='text-5xl text-white cursor-pointer' />
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          {
            contacts.length <= 0 ? <NotFoundContact /> :
              contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              )
              )
          }
        </div>
        <AddAndUpdateContact isOpen={open} onCLose={onClose} />
        <ToastContainer position='bottom-center' />
      </div>
    </>
  )
}

export default App
