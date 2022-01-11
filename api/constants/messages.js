const S = 'successfully'
module.exports = Object.freeze({
  SUCCESS: {
    ACCOUNT: {
      DEACTIVATED: 'Account deactivated ' + S,
      DELETED: 'Account deleted ' + S
    },
    INFO: {
      FOUND: 'Info found ' + S,
      UPDATED: 'Info updated ' + S
    },
    ACCOUNTSETTING: {
      UPDATED: 'Account setting updated ' + S
    },
    QUIZ: {
      CATEGORY: {
        FOUND: 'Quiz Categories found ' + S,
        SAVED: 'Quiz Category saved ' + S,
        UPDATED: 'Quiz Category updated ' + S
      },
      QUESTION: {
        SAVED: 'Quiz Question saved ' + S
      },
      OPTION: {
        SAVED: 'Quiz Option saved ' + S,
        DELETED: 'Quiz Option deleted ' + S
      },
      CREATED: 'Quiz created ' + S
    },
    CHAT: {
      MESSAGE: {
        CREATED: 'Chat message sent ' + S,
        FETCHED: 'Chat messages fetched ' + S,
        DELETED: 'Chat messages deleted ' + S,
        UPDATED: 'Chat messages updated ' + S
      },
      GROUP: {
        CREATED: 'Group created ' + S,
        USER_ADDED: 'User added to group ' + S
      },
      REPORT: {
        SUBMITTED: 'Report submitted ' + S
      },
      FETCHED: 'Chat Room(s) Fetched ' + S,
      USER_REMOVED: 'User removed from the group ' + S,
      ADMIN_ADDED: 'Admin added to the group ' + S,
      USER_MUTED_GROUP: 'User muted the group ' + S,
      USER_LOCKED_GROUP: 'User locked the group ' + S,
      GROUPS_FOUND: 'Group(s) found ' + S,
      USER_UNMUTED_GROUP: 'User unmuted the group ' + S,
      USER_UNLOCKED_GROUP: 'User unlocked the group ' + S
    },
    COMPANY: {
      CREATED: 'Company created ' + S,
      DELETED: 'Company deleted ' + S,
      FETCHED: 'Company fetched ' + S,
      FOLLOWED: 'Company followed ' + S,
      REVIEWED: 'Company review submitted ' + S,
      UNFOLLOWED: 'Company unfollowed ' + S,
      CATEGORY: {
        CREATED: 'Company Category created ' + S,
        DELETED: 'Company Category deleted ' + S,
        FETCHED: 'Company Category fetched ' + S
      }
    },
    HELPANDSUPPORT: {
      MESSAGE: {
        SENT: 'Help Message Sent ' + S,
        FETCHED: 'Messages Fetched ' + S
      },
      REPORTTYPE: {
        CREATED: 'Report Type Created ' + S
      }
    },
    SMILEYSTICKER: {
      CREATED: 'PHOTO created ' + S,
      UPDATED: 'PHOTO updated ' + S,
      DELETED: 'PHOTO deleted ' + S,
      FETCHED: 'PHOTO record(s) fetched ' + S
    },
    USER: {
      CREATED: 'User created ' + S,
      UPDATED: 'User updated ' + S,
      DELETED: 'User deleted ' + S,
      FETCHED: 'User record(s) fetched ' + S,
      BLOCKED: 'User blocked ' + S
    },
    PROFILE: {
      CREATED: 'Profile created ' + S,
      UPDATED: 'Profile updated ' + S,
      DELETED: 'Profile deleted ' + S,
      FETCHED: 'Profile record(s) fetched ' + S
    },
    PROFESSION: {
      CREATED: 'Profession created ' + S,
      UPDATED: 'Profession updated ' + S,
      DELETED: 'Profession deleted ' + S,
      FETCHED: 'Profession record(s) fetched ' + S
    },
    COMMENT: {
      CREATED: 'Comment created ' + S,
      UPDATED: 'Comment updated ' + S,
      DELETED: 'Comment deleted ' + S,
      FETCHED: 'Comment record(s) fetched ' + S
    },
    LIKE: {
      CREATED: 'Liked post ' + S,
      UPDATED: 'Updated like status on post ' + S
    },
    FRIEND: {
      FOUND: 'Friend(s) Found'
    },
    PEOPLE: {
      FOUND: 'People Found'
    },
    FRIENDREQUEST: {
      SENT: 'Friend request sent ' + S,
      ACCEPTED: 'Friend request accepted ' + S,
      REJECTED: 'Friend request rejected ' + S,
      STATUS: 'Friend request status changed ' + S,
      FOUND: {
        PENDING: 'Pending friend request(s) found',
        ACCEPTED: 'Accepted friend request(s) found'
      }
    },
    FRIENDREQUESTSETTING: {
      UPDATED: 'Setting updated ' + S
    },
    GUIDELINE: {
      FETCHED: 'Guideline fetched ' + S,
      UPDATED: 'Guideline updated ' + S
    },
    DISLIKE: {
      CREATED: 'DisLiked post ' + S,
      UPDATED: 'Updated dislike status on post ' + S
    },
    LIKEORDISLIKE: {
      UPDATED: 'Updated like or dislike status on post ' + S
    },
    POST: {
      CREATED: 'Post created ' + S,
      UPDATED: 'Post updated ' + S,
      DELETED: 'Post deleted ' + S,
      FETCHED: 'Post record(s) fetched ' + S,
      LIKED: 'Post liked ' + S,
      DISLIKED: 'Post disliked ' + S,
      PENDING: 'Post like status made pending ' + S
    },
    AUTH: {
      LOGGEDIN: 'User logged in ' + S,
      PASSWORD_CHANGED: 'Password changed ' + S
    }
  },
  FAILURE: {
    ACCOUNT_NOT_VERIFIED: 'Account not Verified',
    RECEIVER_NOT_FOUND: 'Receiver not found',
    SENDER_NOT_FOUND: 'Sender not found',
    COMPANY_CATEGORY_ALREADY_TAKEN: 'Company category already taken',
    OLD_PASSWORD_MISMATCH: 'Old password is incorrect',
    ACCOUNT_ALREADY_DELETED: 'Already Deleted',
    USER_NOT_FOUND: 'User not Found',
    BLOCK_USER_NOT_FOUND: 'User to be blocked not Found',
    PUBLIC_REQUESTS_DISABLED: 'Public Requests are disabled',
    PROFILE_NOT_FOUND: 'Profile for this user not Found',
    POST_NOT_FOUND: 'No Posts Found',
    COMMENT_NOT_FOUND: 'No Comments Found',
    PROFESSION_NOT_FOUND: 'Profession not found',
    USERS_NOT_FOUND: 'Users not Found',
    EMAIL_ALREADY_TAKEN: 'Email already taken',
    USERNAME_ALREADY_TAKEN: 'Username already taken',
    MOBILE_ALREADY_TAKEN: 'Mobile No. already taken',
    MOBILE_NOT_FOUND: 'Mobile No. not registered with us',
    AUTH_FAILED: 'Auth failed',
    NO_LIKES_OR_DISLIKES_FOUND: 'No likes or dislikes found on the post',
    SWW: 'Something went wrong!!',
    NOT_AUTHORIZED: 'You are not authorized to access this route!!',
    NO_ROLE_ASSIGNED: 'No Role Assigned to this user!!',
    UNAUTHORIZED: 'You are not authorized to do this operation!!',
    FRIEND_REQUEST_ALREADY_SENT: 'Friend Request Already sent!!',
    SENDER_NOT_FOUND: 'Sender Not Found',
    RECEIVER_NOT_FOUND: 'Receiver Not Found',
    NO_FRIENDS_FOUND: 'Friends Not Found',
    NO_FRIEND_REQUESTS_FOUND: 'Not Friend Requests Found',
    DISABLED_CANNOT_RECEIVE_REQUEST: 'This user cannot receive requests',
    CHATROOM_NOT_FOUND: 'Chat Room not found',
    USER_NOT_ASSIGNED_TO_CHATROOM: 'User should be part of chat room',
    NO_GROUP_FOUND: 'Group not found',
    USER_IS_ALREADY_ADMIN: 'User is already admin',
    USER_ONE_NOT_FOUND: 'User one not found',
    USER_TWO_NOT_FOUND: 'User two not found',
    CHAT_ROOM_NOT_FOUND: 'Chat Room not found',
    NOT_YOUR_MESSAGE_SO_CANNOT_DELETE_FOR_ALL:
      'The message does not belong to this user therefore he/she cannot delete this for all but for himself/herself'
  }
})
