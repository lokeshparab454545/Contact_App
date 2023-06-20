import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Model from './Model';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
})
const AddAndUpdateContact = ({ contact, isUpdate, isOpen, onCLose }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            toast.success("Add Contact Sucessfully");
            onCLose();
        } catch (error) {
            console.log(error);
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            toast.success("Updated Contact Sucessfully");
            onCLose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Model isOpen={isOpen} onCLose={onCLose}>
            <Formik
                validationSchema={contactSchemaValidation}
                initialValues={
                    isUpdate
                        ? {
                            name: contact.name,
                            email: contact.email,
                        } : {
                            name: "",
                            email: "",
                        }}
                onSubmit={(values) => {
                    console.log(values)
                    isUpdate
                        ? updateContact(values, contact.id)
                        : addContact(values);
                }}
            >
                <Form className='flex flex-col gap-3'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field className="h-10 border p-2" name="name" />
                        <div className="text-red-500 text-xs ">
                            <ErrorMessage name='name' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Field type="email" className="h-10 border p-2" name="email" />
                        <div className="text-red-500 text-xs ">
                            <ErrorMessage name='email' />
                        </div>
                    </div>
                    <button className='self-end bg-orange px-3 py-1.5 border'>{isUpdate ? "Update" : "Add"} Contact</button>
                </Form>
            </Formik>
        </Model>
    )
}

export default AddAndUpdateContact
