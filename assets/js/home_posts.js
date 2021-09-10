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
                //    console.log(data);
                let newPost = newPostDom(data.data.post);
                $(".posts-list-container>ul").prepend(newPost);
                // space before the class means that it is added to this post
                deletePost($(' .delete-post-button', newPost));
                // call the create comment class
                // new PostComments(data.data.post._id);
                
                // CHANGE :: enable the functionality of the toggle like button on the new post
                new ToggleLike($(' .toggle-like-button', newPost));
                    
                new Noty({
                        theme: 'sunset',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    };
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<div class="taskbox" style="padding-left:1rem ;padding-right:1rem ;" id="post-${post._id}">
    
        <div id="taskName">
         
            <div>
                <span class="TextinBlock name " style="line-height:2rem;text-decoration:#ee1c24 underline;text-underline-offset:3px ;">${post.content}</span><br><span class="TextinBlock" style="font-size:0.8rem; font-weight:400 "><i class="far fa-calendar-alt" style="color:#ee1c24 ;"></i> ${new Date(post.createdAt).toDateString()}</span>
            </div> 
        </div> 
        <div id="aboutcat">
            
            <p class="catstyle">${post.user.name}</p>
           
                 <a id="dele" type="radio" class="delete-post-button mybutton" href="/posts/destroy/${post._id}"><span class="TextinBlock" style="font-size:0.8rem; font-weight:400; margin:1rem; "><i class="fas fa-trash-alt"></i></span></a> 
                 <a class="toggle-like-button mybutton" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                 <span class="TextinBlock" style="font-size:0.8rem; font-weight:400; margin:1rem; ">0<i class="fas fa-heart"></i></span>
                </a>
     
        </div>
        <div id="abouttask" style="border-top:none;" class="post-comments">
            <!-- form to take comments -->
           
                <form action="/comments/create" method="POST" style="margin-bottom:-4rem;" id="new-comment-form" >
                   
                        <div id="tasktitle">
                            <div class="Block">
                                <input type="text" id="Posts" name="content" rows="1" placeholder="Comment here on the above post..." required="true"></textarea>
                                <input type="hidden" name="post" value="${post._id}" >
                            </div> 
                        </div>
                    <!-- add task and delete task button  -->
                    <div class="boxes" style="justify-content:center;margin:none;">
                        <button type="submit" style="background-image:linear-gradient(45deg,rgba(238,28,36,1),rgba(33,38,44,1));padding:5px 1px;">Add Comment</button>
                    </div>
                    
                </form>
              
                <div class="desc">
                    Comments:
                </div>
                <!-- <span class="TextinBlock" style="font-size:0.9rem; font-weight:400;"><%= post.taskdescription %></p></span> -->
        </div>
        <ul style="padding-left:1.1rem;margin-top: 0px;margin-right: 0px;padding-right: 0px;width: 100%;" id="post-comments-list">
        </ul>
              
    </div>`)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'sunset',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    // let convertPostsToAjax = function(){
    //     $('.posts-list-container>ul').each(function(){
    //         let self = $(this);
    //         let deleteButton = $(' .delete-post-button', self);
    //         deletePost(deleteButton);

    //         // get the post's id by splitting the id attribute
    //         let postId = self.prop('id').split("-")[1];
    //         console.log(postId);
    //         new PostComments(postId);
    // });
    // }
    let convertPostToAjax = function () {
        let deleteLinks = $('.delete-post-button');
        for (deleteLink of deleteLinks) {
            deletePost(deleteLink);
        }
    };
        //   convertPostToAjax();
        
        
    createPost();
    convertPostToAjax();
    
}