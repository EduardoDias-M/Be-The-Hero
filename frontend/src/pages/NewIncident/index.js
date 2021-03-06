import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './style.css'

import api from '../../services/api'

export default function NewIncident(e) {

    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('') 
    
    const history = useHistory()
        
    const ngoId = localStorage.getItem('ngoId')

    async function handleNewIncident(e) {
       e.preventDefault()
        const data = {
            title, 
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ngoId,
                }
            })
            history.push('/profile')

        } catch(error) {
            console.log('Error ' + error)
        }
    }
    
    return(
        <div className="new-incident-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt='Be the Hero' />

                    <h1> Register an incident </h1>
                    <p> Explain the incident so people can help you about it. </p>

                    <Link className="back-link" to='/profile'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Returns
                    </Link>


                </section> 

                <form onSubmit= {handleNewIncident}>
                    <input 
                        placeholder="Title"
                        value={title}
                        onChange = {e => setTitle(e.target.value)}
                        required
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                        required
                    />

                    <input 
                        placeholder="Value"
                        value={value}
                        onChange = {e => setValue(e.target.value)}
                        required
                    />

                    <button className="button" type="submit"> Register </button>
                </form>

            </div>
        </div>
    )
}
