<template>
  <div class="container">
    <h1>To-Do List — Add & Delete</h1>

    <!-- FORM ADD TASK -->
    <div class="form">
      <input v-model="title" placeholder="Judul Task">
      <input v-model="description" placeholder="Deskripsi Task">
      <button @click="addTask">Tambah</button>
    </div>

    <hr>

    <!-- LIST TASK -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span>
          <strong>{{ task.title }}</strong><br>
          {{ task.description }}
        </span>

        <button @click="deleteTask(task.id)">Hapus</button>
      </li>
    </ul>

    <p v-if="tasks.length === 0" style="text-align:center;color:#666;">
      Belum ada task 😴
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('')
const description = ref('')
const tasks = ref([])

const loadTasks = async () => {
  try {
    const data = await $fetch('/api/getTasks')
    tasks.value = data
  } catch (err) {
    console.error('Error loading tasks:', err)
  }
}

const addTask = async () => {
  if (!title.value.trim() || !description.value.trim()) {
    alert('Judul & Deskripsi tidak boleh kosong!')
    return
  }

  await $fetch('/api/addTask', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value
    }
  })

  title.value = ''
  description.value = ''
  loadTasks()
}

const deleteTask = async (id) => {
  if (!confirm('Yakin mau hapus task ini?')) return

  await $fetch(`/api/deleteTask?id=${id}`, {
    method: 'DELETE'
  })

  loadTasks()
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.form input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.form button {
  padding: 10px 16px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.form button:hover {
  background: #4338ca;
}

hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li span {
  max-width: 75%;
  word-wrap: break-word;
}

li button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

li button:hover {
  background: #dc2626;
}
</style>