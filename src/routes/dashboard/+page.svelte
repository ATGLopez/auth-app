<script lang="ts">
	export let data;
</script>

<h2 class="text-xl font-bold mb-2">Registered Users</h2>
<ul class="space-y-2">
	{#each data.users as user}
		<li class="p-2 bg-gray-100 rounded">{user.id} - {user.username} - {user.password} </li>
	{/each}
</ul>

<a href="/logout" class="text-red-500 underline">Logout</a>