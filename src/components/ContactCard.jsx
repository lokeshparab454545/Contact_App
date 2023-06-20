import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { HiOutlineUserCircle, HiTrash } from "react-icons/hi";
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';

const ContactCard = ({ contact }) => {
    const { isOpen, open, onClose } = useDisclose();
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            toast.success("Contact Deleted Sucessfully")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div key={contact.id} className='flex justify-between bg-yellow items-center p-2 rounded-lg'>
                <div className="flex gap-2">
                    <HiOutlineUserCircle className='text-orange text-4xl' />
                    <div className=''>
                        <h2 className='text-medium'>{contact.name}</h2>
                        <p className='text-sm'>{contact.email}</p>
                    </div>
                </div>
                <div className='flex text-3xl gap-1'>
                    <RiEditCircleLine onClick={isOpen} className='cursor-pointer' />
                    <HiTrash onClick={() => deleteContact(contact.id)} className='text-orange cursor-pointer' />
                </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate isOpen={open} onCLose={onClose} />
        </>
    )
}

export default ContactCard
