const axios = require('axios');

export async function get_data() {
  return await axios({
    url: "http://localhost:5000/todos",
    method: 'get'
  })
}
export async function post_data(todo) {
  return await axios({
    url: "http://localhost:5000/todos",
    method: 'post',
    data: {
      todos: todo.todos,
      status: todo.status
    }
  })
}

export async function put_data(todo) {
  // return await axios.put(`localhost:5000/todos/${todo.id}`, {
  //   todos: todo.value,
  //   status: todo.status
  // })
  return await axios({
    url: `http://localhost:5000/todos/${todo._id}`,
    method: 'put',
    data: {
      todos: todo.todos,
      status: todo.status
    }
  })
}


export async function delete_data(todo) {
  //return await axios.delete(`localhost:5000/todos/${todo.id}`)
  return await axios({
    url: `http://localhost:5000/todos/${todo._id}`,
    method: 'delete'
  })
}

export async function delete_All() {
  //return await axios.delete(`localhost:5000/todos/${todo.id}`)
  return await axios({
    url: "http://localhost:5000/todos/deleteAll/2",
    method: 'delete'
  })
}

// (async () => {
//   try {
//     let t = await put_data({
//       _id :"5e43823ab23f8d4360bce54d",
//       todos : "check", 
//       status :1
//     });
//     console.log(t);
//   } catch (e) {
//     console.log(e)
//   }
// })()