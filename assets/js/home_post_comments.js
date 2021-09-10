{
    let createComment = function () {
      let newCommentForm = $('#new-comment-form');
      newCommentForm.submit(function(e) {
        e.preventDefault();
  
        $.ajax({
          type: 'post',
          url: '/comments/create',
          data: newCommentForm.serialize(),
          success: function (data) {
            console.log(data);
            let newComment = newCommentDom(data.data.comment);
            $('#post-comments-list').append(newComment);
            deleteComment($(' .delete-comment-btn', newComment));
            // new ToggleLike($(' .toggle-like-btn', newComment));
            
            // CHANGE :: enable the functionality of the toggle like button on the new comment
            new ToggleLike($(' .toggle-like-button', newComment));
            
            new Noty({
                theme: 'sunset',
                text: "Comment published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
          },
  
          error: function (err) {
            console.log(err);
          },
        });
      });
    };
  
    let newCommentDom = function (comment) {
        return $(`<li style="width: 100%;display: flex;" id="comment-${comment._id}">
        <div id="taskName">
            <div>
                <span class="TextinBlock name " style="line-height:1rem;text-underline-offset:3px ;size:1rem;font-weight: 400;">->${comment.content}</span></div> 
        </div> 
        <div id="aboutcat">
            
            <p class="catstyle" style="background-image:linear-gradient(-25deg,rgb(192, 16, 16),rgba(34, 33, 33, 0.2));font-size:1rem;color:black;padding:8px 14px;color:white !important;">${comment.user.name}</p>
            <a id="dele" type="radio" class="delete-comment-btn mybutton" href="/comments/destroy/${comment._id}"><span class="TextinBlock" style="font-size:0.8rem; font-weight:400; margin:1rem; "><i class="fas fa-trash-alt"></i></span></a>
            <a class="toggle-like-button mybutton" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
            <span class="TextinBlock" style="font-size:0.8rem; font-weight:400; margin:1rem; ">0<i class="fas fa-heart"></i></span>
            </a>
        </div> 
    </li>`);
    };
  
    let deleteComment = function (deleteLink) {
      $(deleteLink).click(function (e) {
        e.preventDefault();
  
        $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
          success: function (data) {
            $(`#comment-${data.data.comment_id}`).remove();
            new Noty({
                theme: 'sunset',
                text: "Comment Removed!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
    };
  
    let convertToAjx = function () {
      let deleteLinks = $('.delete-comment-btn');
      for (deleteLink of deleteLinks) {
        deleteComment(deleteLink);
      }
    };
    // let helper = function(){
    //  let commentforms = $('#new-comment-form');
    //   for (form of commentforms) {
    //     createComment();
    //   }
    // }
    // helper();
   
    convertToAjx();
    createComment();

}