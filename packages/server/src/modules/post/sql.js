import { Op } from 'sequelize';
// import { returnId, orderedFor } from '../../sql/helpers';
// import knex from '../../sql/connector';
import models from '../../database/models';

export default class Post {
  // postsPagination(limit, after) {
  //   return knex
  //     .select('id', 'title', 'content')
  //     .from('post')
  //     .orderBy('id', 'desc')
  //     .limit(limit)
  //     .offset(after);
  // }
  postsPagination(limit, offset) {
    return models.Post.findAll({
      attributes: ['id', 'title', 'content'],
      order: [['id', 'DESC']],
      limit,
      offset
    });
  }

  // async getCommentsForPostIds(postIds) {
  //   const res = await knex
  //     .select('id', 'content', 'post_id AS postId')
  //     .from('comment')
  //     .whereIn('post_id', postIds);
  //
  //   return orderedFor(res, postIds, 'postId', false);
  // }
  async getCommentsForPostIds(postIds) {
    return models.Post.findAll({
      attributes: ['id', 'content', 'post_id AS postId'],
      where: {
        post_id: {
          [Op.in]: postIds
        }
      }
    });
  }

  // getTotal() {
  //   return knex('post')
  //     .countDistinct('id as count')
  //     .first();
  // }
  getTotal() {
    return models.Post.count();
  }

  // post(id) {
  //   return knex
  //     .select('id', 'title', 'content')
  //     .from('post')
  //     .where('id', '=', id)
  //     .first();
  // }
  post(id) {
    return models.Post.findOne({
      attributes: ['id', 'title', 'content'],
      where: {
        id
      }
    });
  }

  // addPost({ title, content }) {
  //   return returnId(knex('post')).insert({ title, content });
  // }
  addPost({ title, content }) {
    return models.Post.create({
      title,
      content
    });
  }

  // deletePost(id) {
  //   return knex('post')
  //     .where('id', '=', id)
  //     .del();
  // }
  deletePost(id) {
    return models.Post.destroy({
      where: {
        id
      }
    });
  }

  // editPost({ id, title, content }) {
  //   return knex('post')
  //     .where('id', '=', id)
  //     .update({
  //       title: title,
  //       content: content
  //     });
  // }
  editPost({ id, title, content }) {
    return models.Post.update(
      { title, content },
      {
        where: {
          id
        }
      }
    );
  }

  // addComment({ content, postId }) {
  //   return returnId(knex('comment')).insert({ content, post_id: postId });
  // }
  addComment({ content, postId }) {
    return models.Comment.create({
      content,
      post_id: postId
    });
  }

  // getComment(id) {
  //   return knex
  //     .select('id', 'content')
  //     .from('comment')
  //     .where('id', '=', id)
  //     .first();
  // }
  getComment(id) {
    return models.Comment.findOne({
      attributes: ['id', 'content'],
      where: {
        id
      }
    });
  }

  // deleteComment(id) {
  //   return knex('comment')
  //     .where('id', '=', id)
  //     .del();
  // }
  deleteComment(id) {
    return models.Comment.destroy({
      where: {
        id
      }
    });
  }

  // editComment({ id, content }) {
  //   return knex('comment')
  //     .where('id', '=', id)
  //     .update({
  //       content: content
  //     });
  // }
  editComment({ id, content }) {
    return models.Post.update(
      { content },
      {
        where: {
          id
        }
      }
    );
  }
}
