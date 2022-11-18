import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import styles from './AddPost.module.scss';


export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  // const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads/upload', formData)

      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  function addTags(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value;
    if (!value.trim()) return
    setTags([...tags, value]);
    console.log(tags);
    e.target.value = ''
  }

  function removeTags(index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  const onSubmit = async () => {
    try {
      

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/posts/${id}`, fields)
        : await axios.post('/posts/create', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи!');
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);

        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, [id]);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return navigate(`/`);
  }

  return (
    <Paper style={{ padding: 30 }} sx={{ boxShadow: '0 2px 4px 0 rgb(32 35 51 / 2%), 0 1px 1px 0 rgb(32 35 51 / 4%)', borderRadius: 4 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large" style={{ borderRadius: 10 }}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage} style={{ marginLeft: 20, borderRadius: "10px" }}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`https://envil-blog-mern.herokuapp.com/uploads/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        // value={fields.title}
        // onChange={(e) => setFieldValue('title', e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            <span className={styles.tag_title}>{tag}</span>
            <span className={styles.tag_close_icon} onClick={() => removeTags(index)}>&times;</span>
          </div>
        ))}
      </div>
      <TextField
        
        onKeyDown={addTags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained" style={{ borderRadius: 10 }}>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large" style={{ borderRadius: 10 }}>Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};