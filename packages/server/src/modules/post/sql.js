import { Op } from 'sequelize';
// import { returnId, orderedFor } from '../../sql/helpers';
import { orderedFor } from '../../sql/helpers';

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
  async postsPagination(limit, offset) {
    return await models.Post.findAll({
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
    const res = await models.Comment.findAll({
      attributes: ['id', 'content', ['post_id', 'postId']],
      where: {
        post_id: {
          [Op.in]: postIds
        }
      }
    });

    return orderedFor(res, postIds, 'postId', false);
  }

  // getTotal() {
  //   return knex('post')
  //     .countDistinct('id as count')
  //     .first();
  // }
  async getTotal() {
    return await models.Post.count();
  }

  // post(id) {
  //   return knex
  //     .select('id', 'title', 'content')
  //     .from('post')
  //     .where('id', '=', id)
  //     .first();
  // }
  async post(id) {
    return await models.Post.findOne({
      attributes: ['id', 'title', 'content'],
      where: {
        id
      }
    });
  }

  // addPost({ title, content }) {
  //   return returnId(knex('post')).insert({ title, content });
  // }
  async addPost({ title, content }) {
    return await models.Post.create({
      title,
      content
    });
  }

  // deletePost(id) {
  //   return knex('post')
  //     .where('id', '=', id)
  //     .del();
  // }
  async deletePost(id) {
    return await models.Post.destroy({
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
  async editPost({ id, title, content }) {
    return await models.Post.update(
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
  async addComment({ content, postId }) {
    return await models.Comment.create({
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
  async getComment(id) {
    return await models.Comment.findOne({
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
  async deleteComment(id) {
    return await models.Comment.destroy({
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
  async editComment({ id, content }) {
    return await models.Post.update(
      { content },
      {
        where: {
          id
        }
      }
    );
  }
}
