import React, {useEffect} from 'react'
import '@/css/styles.css'

const Message = () => {

    
    return (
        <>
            <div id="namboariko">
                {/* */}
                    <div className="container">
                        <div className="row">
                            {/* BEGIN INBOX */}
                            <div className="col-md-12">
                                <div className="grid email">
                                    <div className="grid-body">
                                        <div className="row">
                                            {/* BEGIN INBOX MENU */}
                                            <div className="col-md-3">
                                                <h2 className="grid-title"><i className="i fa fa-inbox"></i> Inbox</h2>
                                                <a className="a btn btn-block btn-primary" data-toggle="modal" data-target="#compose-modal"><i
                                                        className="i fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE</a>
                    
                                                <hr/>
                                            </div>
                                            {/* END INBOX MENU */}
                    
                                            {/* BEGIN INBOX CONTENT */}
                                            <div className="col-md-9">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <label style={{marginRight: '8px'}} className="">
                                                            <div className="icheckbox_square-blue"style={{position: 'relative'}}><input
                                                                    type="checkbox" id="check-all" className="icheck"
                                                                    style={{position: 'absolute', top: '-20%', left: '-20%', display: 'block', width: '140%', height: '140%', margin: '0px', padding: '0px', border: '0px', opacity: '0', background: 'rgb(255, 255, 255)'}}/><ins
                                                                    className="iCheck-helper"
                                                                    style={{position: 'absolute', top: '-20%', left: '-20%', display: 'block', width: '140%', height: '140%', margin: '0px', padding: '0px', border: '0px', opacity: '0', background: 'rgb(255, 255, 255)'}}></ins>
                                                            </div>
                                                        </label>
                                                        <div className="btn-group">
                                                            <button type="button" className="btn btn-default dropdown-toggle"
                                                                data-toggle="dropdown">
                                                                Action <span className="spa caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" role="menu">
                                                                <li className='li'><a className='a' href="#">Mark as read</a></li>
                                                                <li className='li'><a className='a' href="#">Mark as unread</a></li>
                                                                <li className='li'><a className='a' href="#">Mark as important</a></li>
                                                                <li className="li divider"></li>
                                                                <li className='li'><a className='a' href="#">Report spam</a></li>
                                                                <li className='li'><a className='a' href="#">Delete</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                    
                                                    <div className="col-md-6 search-form">
                                                        <form action="#" className="text-right">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control input-sm" placeholder="Search"/>
                                                                <span className="spa input-group-btn">
                                                                    <button type="submit" name="search"
                                                                        className="btn_ btn-primary btn-sm search"><i
                                                                            className="i fa fa-search"></i></button></span>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                    
                                                <div className="padding"></div>
                    
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className="tr read">
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="time">08:30 PM</td>
                                                            </tr>
                                                            <tr className="tr read">
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className="tr read">
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star-o"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className="tr read">
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                            <tr className='tr'>
                                                                <td className="td action"><input type="checkbox" /></td>
                                                                <td className="td action"><i className="i fa fa-star"></i></td>
                                                                <td className="td action"><i className="i fa fa-bookmark-o"></i></td>
                                                                <td className="td name"><a className='a' href="#">Larry Gardner</a></td>
                                                                <td className="td subject"><a className='a' href="#">Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit, sed </a></td>
                                                                <td className="td time">08:30 PM</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                    
                                                <ul className="pagination">
                                                    <li className="li disabled"><a className='a'href="#">«</a></li>
                                                    <li className="li active"><a className='a' href="#">1</a></li>
                                                    <li className='li'><a className='a' href="#">2</a></li>
                                                    <li className='li'><a className='a' href="#">3</a></li>
                                                    <li className='li'><a className='a' href="#">4</a></li>
                                                    <li className='li'><a className='a' href="#">5</a></li>
                                                    <li className='li'><a className='a' href="#">»</a></li>
                                                </ul>
                                        </div>
                                            {/* END INBOX CONTENT */}
                    
                                            {/* BEGIN COMPOSE MESSAGE */}
                                            <div className="modal fade" id="compose-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-wrapper">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header bg-blue">
                                                                <button type="button" className="close" data-dismiss="modal"
                                                                    aria-hidden="true">×</button>
                                                                <h4 className="modal-title"><i className="i fa fa-envelope"></i> Compose New Message
                                                                </h4>
                                                            </div>
                                                            <form action="#" method="post">
                                                                <div className="modal-body">
                                                                    <div className="form-group">
                                                                        <input type="email" className="form-control" placeholder="To"/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="email" className="form-control" placeholder="Cc"/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="email" className="form-control"
                                                                            placeholder="Bcc"/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="email" className="form-control"
                                                                            placeholder="Subject"/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <textarea name="message" id="email_message" className="form-control"
                                                                            placeholder="Message" style={{height: '120px'}}></textarea>
                                                                    </div>
                                                                    <div className="form-group"> <input type="file"/>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-default" data-dismiss="modal"><i
                                                                            className="i fa fa-times"></i> Discard</button>
                                                                    <button type="submit" className="btn btn-primary pull-right"><i
                                                                            className="i fa fa-envelope"></i> Send Message</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* END COMPOSE MESSAGE */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  END INBOX */}
                        </div>
                    </div>
                {/* */}
            </div>
        </>
    )
}

export default Message