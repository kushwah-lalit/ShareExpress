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
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    };
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<div class="taskbox" style="padding-left:1rem ;padding-right:1rem ;" id="post-${ post._id }">
        <div id="taskName">
           
            <div>
                <span class="TextinBlock name " style="line-height:2rem;text-decoration:#ee1c24 underline;text-underline-offset:3px ;">${ post.content}</span><br><span class="TextinBlock" style="font-size:0.8rem; font-weight:400 "><i class="far fa-calendar-alt" style="color:#ee1c24 ;"></i> ${ new Date(post.createdAt).toDateString()}</span>
            </div> 
        </div> 
        <div id="aboutcat">
            
            <p class="catstyle">${ post.user.name }</p>
            <a id="dele" type="radio" class="mybutton" href="/posts/destroy/${post.id }"><span class="TextinBlock" style="font-size:0.8rem; font-weight:400; margin:1rem; "><i class="fas fa-trash-alt"></i></span></a> 
           
        </div>
        <div id="abouttask" style="border-top:none;">
            <!-- form to take comments -->
           
                <form action="/comments/create" method="POST" style="margin-bottom:-4rem;" >
                    <!-- for the task tile -->
                        <div id="tasktitle">
                            <!-- <div class="headstyle">
                                <label for="Posts">
                                    Make Comment
                                </label>
                            </div> -->
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
                 </div>
        
              
    </div>`)
    }
    createPost();
    


}