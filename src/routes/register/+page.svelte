<script lang="ts">
    import { enhance } from "$app/forms";

    let username: string = $state('');
    let password: string = $state('');
    let confirmPassword: string = $state('');
    let errors = $state({ username: '', password: '', confirmPassword: '' });

    function validateForm(): boolean {
        errors = { username: '', password: '', confirmPassword: '' };
        if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters.';
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
        return !errors.username && !errors.password && !errors.confirmPassword;
    }

    function handleSubmit(event: SubmitEvent) {
        if (!validateForm()) {
            event.preventDefault();
        }
    }

</script>

<main>
    <div class='m-4 py-2'>
        <h1 class="flex m-1 py-2 text-2xl font-bold border border-slate-400 border-x-0 justify-center">REGISTER</h1>
    </div>

    <form class="m-4" method="POST" use:enhance onsubmit={handleSubmit}>
        <div class="sm:col-span-4">
            <label for="username" class="block text-md/10 font-medium text-gray-900">Username</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white">
                    <input 
                        id="username" type="text" name="username" autocomplete="username" required
                        bind:value={username} placeholder="Enter your username here." class="block rounded-md" 
                    />
                </div>
                {#if errors.username}<p class="block mt-1 italic text-gray-700">{errors.username}</p>{/if}
            </div>
            
            <label for="password" class="block mt-4 text-md/10 font-medium text-gray-900">Password</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white">
                    <input 
                        id="password" type="password" name="password" autocomplete="new-password" required
                        bind:value={password} placeholder="Enter your password here." class="block rounded-md" 
                    />
                </div>
                {#if errors.password}<p class="block mt-1 italic text-gray-700">{errors.password}</p>{/if}
            </div>

            <label for="confirm_pass" class="block mt-4 text-md/10 font-medium text-gray-900">Confirm Password</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white">
                    <input 
                        id="confirm_pass" type="password" name="confirm_pass" autocomplete="new-password" required
                        bind:value={confirmPassword} placeholder="Confirm your password here." class="block rounded-md" 
                    />
                </div>
                {#if errors.confirmPassword}<p class="block mt-1 italic text-gray-700">{errors.confirmPassword}</p>{/if}
            </div>
        </div>

        
        <button type="submit" class="mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded-md hover:cursor-pointer duration-200">
            Register
        </button>

    </form>
</main>