// curly brackets for the scope
{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        // this is how we fetched the form
        let newPostForm = $('#new-post-form');
        // now preventing the default feature and making the ajax request
        newPostForm.submit(function(e){
            e.preventDefault();
// creating ajax request to submit the post
            $.ajax({
                type: 'post',
                url: '/posts/create',
                // to make form data to json
                data: newPostForm.serialize(),
                success: function(data){
                   console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    };
    createPost();
    // method to create a post in DOM


}