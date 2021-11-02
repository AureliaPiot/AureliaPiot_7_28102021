<template>
    <div class="sign card p-md-5">
        <form>
            <div class="form-group my-md-4">
                <label for="email_input">Email</label>
                <input type="email" class="form-control" id="email_input"  placeholder="Enter email">
            </div>
            <div class="form-group my-md-4">
                <label for="password_input">Password</label>
                <input type="password" class="form-control" id="password_input" placeholder="Password" aria-describedby="passwordHelp">
                <small id="passwordHelp" class="form-text text-muted"> never share your password with anyone else.</small>

            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
</template>

<script>
export default {
  name: 'SignIn',
}
</script>


<style scoped lang="scss">
.sign{
    background: white;

}
</style>
