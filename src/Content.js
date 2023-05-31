/* eslint-disable */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Content.css';




function Header() {
  let [list, setList] = useState([]);
  let [activeID, setActiveID] = useState(9999);
  let [doneList, setDoneList] = useState([]);
  let [act, setAct] = useState("create");

  useEffect(() => {
    axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
      .then((res) => {
        let arr = [...res.data.contents];
        setList(arr);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  useEffect(() => {
    console.log(doneList);
    if (doneList.length >= 1) {
      if (!document.getElementsByClassName("delete-button")[0].classList.contains("delete-on")) {
        document.getElementsByClassName("delete-button")[0].classList.add("delete-on");
      }
    } else {
      document.getElementsByClassName("delete-button")[0].classList.remove("delete-on");
    }
    
  }, [doneList])

  return (
    <>
    <main>
      {
        list.map((v, i) => {
          return (
            <div className="content" key={i}>
              <div className="select" onClick={(e) => {
                if (e.currentTarget.parentElement.classList.contains("content-on")) {
                  e.currentTarget.parentElement.classList.remove("content-on");
                  let newDoneList = [...doneList];
                  newDoneList.splice(newDoneList.indexOf(+v.id), 1);
                  setDoneList(newDoneList);
                } else {
                  e.currentTarget.parentElement.classList.add("content-on");
                  let set = new Set([...doneList]);
                  set.add(+v.id);
                  setDoneList(Array.from(set));
                }
              }}>
                <div className="check"></div>
              </div>
              <p onClick={(e) => {
                if (e.currentTarget.parentElement.classList.contains("content-on")) {
                  e.currentTarget.parentElement.classList.remove("content-on");
                  let newDoneList = [...doneList];
                  newDoneList.splice(newDoneList.indexOf(+v.id), 1);
                  setDoneList(newDoneList);
                } else {
                  e.currentTarget.parentElement.classList.add("content-on");
                  let set = new Set([...doneList]);
                  set.add(+v.id);
                  setDoneList(Array.from(set));
                }
              }}>
                {v.contents}
              </p>

              <div className="box">
                <div className="right" onClick={(e)=>{
                  if (e.currentTarget.parentElement.parentElement.classList.contains("content-right")) {
                    [...document.getElementsByClassName("content")].forEach(el => {
                      el.classList.remove("content-right");
                    });
                  } else {
                    [...document.getElementsByClassName("content")].forEach(el => {
                      el.classList.remove("content-right");
                    });
                    e.currentTarget.parentElement.parentElement.classList.add("content-right");
                  }
                  
                  
                  
                }}><img src='./../right.png'></img></div>
                <div className="edit block" onClick={(e) => {
                  document.getElementsByClassName("editer-title")[0].textContent = "편집하기";
                  document.getElementsByClassName("editer")[0].classList.add("editer-on");
                  document.getElementsByClassName("edit-input")[0].value = v.contents;
                  document.getElementsByClassName("edit-input")[0].focus();
                  e.currentTarget.parentElement.parentElement.classList.remove("content-right");
                  setActiveID(+v.id);
                  setAct("update");
                }}><span>편집</span></div>
                <div className="delete block" onClick={(e) => {
                  e.currentTarget.parentElement.parentElement.classList.remove("content-right");
                  axios.delete(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/delete/${v.id}`)
                  .then((r) => {
                    axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
                      .then((res) => {
                        let arr = [...res.data.contents];
                        setList(arr);
                      })
                      .catch((e) => {
                        console.log(e);
                      })
                  })
                  .catch((e) => {
                    console.log(e);
                  })
                }}><span>삭제</span></div>
              </div>
            </div>
          )
        })
      }
    </main>

    <div className="pluswrap">
      <div className="plus button" onClick={(e) => {
        setAct("create");
        document.getElementsByClassName("editer-title")[0].textContent = "추가하기";
        document.getElementsByClassName("editer")[0].classList.add("editer-on");
        document.getElementsByClassName("edit-input")[0].value = "";
        document.getElementsByClassName("edit-input")[0].focus();
      }}>
        <img src='./../plus.png'></img>
      </div>
      <div className="delete button delete-button" onClick={(e) => {
        e.currentTarget.classList.remove("delete-on");
        Promise.all(doneList.map(w => axios.delete(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/delete/${w}`)))
          .then((r) => {
            setDoneList([]);
            [...document.getElementsByClassName("content")].forEach(e => {
              e.classList.remove("content-on");
            })
            axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
              .then((res) => {
                let arr = [...res.data.contents];
                setList(arr);
              })
              .catch((e) => {
                console.log(e);
              })
          })
          .catch((e) => {
            console.log(e);
          })
      }}>
        <img src='./../delete.png'></img>
      </div>
    </div>


    <div className="editer">
      <div className="getout" onClick={(e) => {
        e.currentTarget.parentElement.classList.remove("editer-on");
      }}></div>
      <div className="inner">
        <p className="title editer-title">편집하기</p>
        <input type="text" className="edit-input" onKeyDown={(e)=>{
          e.stopPropagation();
          if (e.key == "Enter") {
            if(act == "update") {
              e.currentTarget.parentElement.parentElement.classList.remove("editer-on");
              axios.put(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/update/${activeID}`, {contents: document.getElementsByClassName("edit-input")[0].value})
              .then((r) => {
                axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
                  .then((res) => {
                    let arr = [...res.data.contents];
                    setList(arr);
                  })
                  .catch((e) => {
                    console.log(e);
                  })
              })
              .catch((e) => {
                console.log(e);
              })
            } else if (act == "create") {
              e.currentTarget.parentElement.parentElement.classList.remove("editer-on");
              axios.post(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/create`, {contents: document.getElementsByClassName("edit-input")[0].value})
              .then((r) => {
                axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
                  .then((res) => {
                    let arr = [...res.data.contents];
                    setList(arr);
                  })
                  .catch((e) => {
                    console.log(e);
                  })
              })
              .catch((e) => {
                console.log(e);
              })
            }
          }
        }}></input>
      </div>
      <div className="getout2" onClick={(e) => {
        e.currentTarget.parentElement.classList.remove("editer-on");
      }}>
        <img src='./../exit.png'></img>
      </div>

      <div className="submit" onClick={(e) => {
        e.stopPropagation();
        if (act == "update") {
          e.currentTarget.parentElement.classList.remove("editer-on");
          axios.put(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/update/${activeID}`, {contents: document.getElementsByClassName("edit-input")[0].value})
          .then((r) => {
            axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
              .then((res) => {
                let arr = [...res.data.contents];
                setList(arr);
              })
              .catch((e) => {
                console.log(e);
              })
          })
          .catch((e) => {
            console.log(e);
          })
        } else if (act == "create") {
          e.currentTarget.parentElement.classList.remove("editer-on");
          axios.post(`http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/create`, {contents: document.getElementsByClassName("edit-input")[0].value})
            .then((r) => {
              axios.get('http://yhtodo-env.eba-etyrmp7y.ap-northeast-2.elasticbeanstalk.com/api/todos/list')
                .then((res) => {
                  let arr = [...res.data.contents];
                  setList(arr);
                })
                .catch((e) => {
                  console.log(e);
                })
            })
            .catch((e) => {
              console.log(e);
            })
        }
        
      }}>
        <img src='./../submit.png'></img>
      </div>
    </div>
    </>
  );
}

export default Header;