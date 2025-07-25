<script lang="ts">
	let { data } = $props();
</script>

<main class="m-4 py-2">
    <h2 class="text-xl font-bold mb-2">Registered Users</h2>
    <ul class="space-y-2">
        {#each data.users as user}
            <li class="p-2 bg-gray-100 rounded">{user.id} - {user.username} - {user.password} </li>
        {/each}
    </ul>
    
    <a href="/logout" >
        <button type="button" class="mt-6 py-2 px-4 bg-red-500 hover:bg-red-400 rounded-md hover:cursor-pointer duration-200">
            Logout
        </button>
    </a>
</main>