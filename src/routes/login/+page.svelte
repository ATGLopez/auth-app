<script lang="ts">

</script>

<main>
    <div class='m-4 py-2'>
        <h1 class="flex m-1 py-2 text-2xl font-bold border border-slate-400 border-x-0 justify-center">LOGIN</h1>
    </div>

    <form class="m-4" method="POST">
        <div class="sm:col-span-4">
            <label for="username" class="block text-md/10 font-medium text-gray-900">Username</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white">
                    <input 
                        id="username" type="text" name="username" autocomplete="username"
                        placeholder="Enter your username here." class="block rounded-md" 
                    />
                </div>
            </div>
            
            <label for="password" class="block mt-4 text-md/10 font-medium text-gray-900">Password</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white">
                    <input 
                        id="password" type="password" name="password" autocomplete="current-password"
                        placeholder="Enter your password here." class="block rounded-md" 
                    />
                </div>
            </div>
        </div>

        
        <button 
            type="submit" onclick={() => {}} 
            class="mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded-md hover:cursor-pointer duration-200"
        >
            Register
        </button>

    </form>
</main>