import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// import { timeSince } from '../../helpers/calcTimeAgo';
import { addComment, deleteComment, editComment, getComment, getCommentById } from '../../redux/user-actions';
import { timeSince } from '../../utils/calcTimeAgo';


const Comments = () => {
    const dispatch = useDispatch()
    const [val, setVal] = useState('')
    const [newEditComm, setNewEditComm] = useState('')
    let params = useParams()
    let user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        dispatch(getComment(params.id))
    }, [])
    const comments = useSelector(state => state.userProducts.comments)

    const creatingComment = (e) => {
        e.preventDefault()
        dispatch(addComment(val, user.email, +params.id, user.id))
        setVal('')
    }
    const handleChangeEdit = (e) => {
        setVal(e.target.value)
    }
    function deleteCommentTemp(id, productId) {
        dispatch(deleteComment(id, productId))
        dispatch(getComment(params.id))
    }
    const [bool, setBool] = useState(false)
    const [checkid, setCheckid] = useState()
    let [bool2, setBool2] = useState(true)
    const editComm = (id) => {
        setBool(true)
        setCheckid(id)
    }
    const changeEditedComm = (e) => {
        setNewEditComm(e.target.value)
    }
    const saveEditedComm = (id) => {
        dispatch(editComment(newEditComm, id, params.id))
        setBool(false)
        setBool2(true)
    }
    return (
        <>

            {
                comments ? (
                    comments.sort((a, b) => b.timeSeconds - a.timeSeconds).map((item) => (
                        <div key={item.id}>

                            <div className="comments-block">
                                <div className="who-is">
                                    <img style={{ width: '30px', borderRadius: '50%' }} src={
                                        item.photoURL ? item.photoURL : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="" />
                                    <p className='disp-name'>{
                                        item.owner}</p>
                                </div>
                                <span className='date-comm'>Создано в {item.time}, {' '}
                                    {timeSince(Date.parse(item.createdAt))} назад </span>

                                {

                                    bool && checkid === item.id ? (
                                        <>

                                            <div className="input-div edit-comm ">
                                                <strong className="input-name">{
                                                    item.owner}
                                                </strong>
                                                <textarea
                                                    rows="2"
                                                    className="input-box edit-comm-box"
                                                    type='text'
                                                    placeholder='Type your reply here.'
                                                    component='input'
                                                    value={newEditComm}
                                                    onChange={changeEditedComm}
                                                >

                                                </textarea>
                                            </div>
                                            <Button
                                                color='success'
                                                onClick={() => saveEditedComm(item.id)} >Сохранить</Button>
                                        </>
                                    ) : (<p className='comment-text' >{item.text}</p>)
                                }
                                {
                                    user ? (
                                        item.owner === user.email ? (
                                            bool2 ? (
                                                <>
                                                    <Button onClick={() => {
                                                        setNewEditComm(item.text)
                                                        dispatch(getCommentById(item.id))
                                                        editComm(item.id)
                                                        setBool2(false)
                                                    }} >Изменить</Button>
                                                    <Button
                                                        color='error'
                                                        onClick={() => {
                                                            deleteCommentTemp(item.id, item.productId)
                                                        }}
                                                    >Удалить комментарий</Button>
                                                </>) : (

                                                <></>
                                            )
                                        ) : (
                                            <></>
                                        )
                                    ) : (null)


                                }
                            </div>
                        </div>
                    ))



                ) : (null)
            }
            {
                !user || user.username === 'guest' ? (
                    <Link to='/register' >
                        <h5 className='login-to' >Войдите чтобы оставить комментарий</h5>
                    </Link>

                ) : (

                    <>
                        <div className='comments-block' >
                            <form>
                                <div className="form">
                                    <div className="row">
                                        <div className="row">
                                            <div className="input-div">
                                                <span className="input-name">{user.displayName !== null ? user.displayName : null}</span>
                                                {
                                                    bool2 ? (
                                                        <textarea
                                                            rows="2"
                                                            className="input-box"
                                                            type='text'
                                                            value={val}
                                                            placeholder='Напишите отзыв о товаре'
                                                            component='input'
                                                            onChange={handleChangeEdit}></textarea>
                                                    ) : (
                                                        <textarea
                                                            readOnly
                                                            rows="2"
                                                            className="input-box"
                                                            type='text'
                                                            component='input'
                                                            value={val}
                                                            onChange={handleChangeEdit}></textarea>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-div">
                                        <Button
                                            variant='contained'
                                            className="post-btn"
                                            onClick={creatingComment}
                                            type="submit"
                                        >
                                            Отправить
                                        </Button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }

        </>
    );
};

export default Comments;