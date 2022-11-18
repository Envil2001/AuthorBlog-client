
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import styles from './userProfile.module.scss';

export const UserProfile = () => {
    const { id } = useParams();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [fullName, setFullName] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector(state => state.auth.data);
    const isEditable = userData?._id === id
    const inputFileRef = useRef(null);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/uploads/upload', formData)
            setAvatarUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при загрузке файла!');
        }
    };

    const onSubmit = async () => {
        try {
            const fields = {
                avatarUrl,
                fullName
            };
            await axios.patch(`/auth/user/${id}`, fields)
        } catch (err) {
            console.warn(err);
            alert('Ошибка при обновлении юзера!');
        }
    };


    useEffect(() => {
        axios
            .get(isEditable ? '/auth/me' : `/auth/user/${id}`)
            .then((res) => {
                setAvatarUrl(res.data.avatarUrl);
                setFullName(res.data.fullName)
            })
            .catch(err => {
                console.warn(err);
                alert('Ошибка при получении статьи');
            })
    }, [id, isEditable]);



    return (
        <section className={styles.block_user}>
            <div className={styles.avatar}>

                <img src={avatarUrl ? 'https://envil-blog-mern.herokuapp.com/uploads/' + avatarUrl : '/noavatar.png'} alt={fullName} style={{objectFit: "cover"}}/>
                {
                    isEditable &&
                    <>
                        <div className={styles.changeAvatar} onClick={() => inputFileRef.current.click()}>
                            <svg width="25" height="22" viewBox="0 0 25 22" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M15.5157 6.87301C14.2182 6.87301 11.8255 8.78874 9.85328 11.257C8.90067 10.368 7.99372 9.79727 7.3947 9.79727C5.54905 9.79727 0.75 16.4903 0.75 20.0314C0.75 21.4935 2.98651 21.4935 6.65628 21.4935C6.81824 21.4935 6.98021 21.4935 7.14191 21.4933H12.4531C13.4076 21.5082 14.4392 21.4935 15.516 21.4935C20.409 21.4935 24.3754 21.4935 24.3754 20.0314C24.3751 15.5455 17.9858 6.87301 15.5157 6.87301ZM3.37501 5.75003C4.82481 5.75003 6.00003 4.57481 6.00003 3.12501C6.00003 1.67522 4.82481 0.5 3.37501 0.5C1.92522 0.5 0.75 1.67522 0.75 3.12501C0.75 4.57481 1.92522 5.75003 3.37501 5.75003Z" fill="white"></path></svg>
                        </div>
                        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                    </>
                }

            </div>
            <div className={styles.content_user}>
                {
                    isEditable ?
                        <>
                            <TextField
                                sx={{ borderRadius: '10px' }}
                                className={styles.field}
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                fullWidth
                            />
                            <Button onClick={onSubmit} size="large" variant="contained" style={{ borderRadius: 10, marginTop: '20px' }}>
                                Обновить
                            </Button>
                        </>
                        :
                        <h3>{fullName}</h3>
                }


            </div>
        </section>
    )
}