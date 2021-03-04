// import all state of all pages & global
import globalComputed from '../lowcode/computed'
import indexComputed from '../lowcode/index/computed';
import graphComputed from '../lowcode/graph/computed';
import userComputed from '../lowcode/user/computed';
import graphDetailComputed from '../lowcode/graphDetail/computed';
import aboutComputed from '../lowcode/about/computed';
import expertDetailComputed from '../lowcode/expertDetail/computed';
import classificationComputed from '../lowcode/classification/computed';
import invacationsComputed from '../lowcode/invacations/computed';
import favoritesComputed from '../lowcode/favorites/computed';
import categoryComputed from '../lowcode/category/computed';


const computed = {
  global: globalComputed,
  index: indexComputed,
  graph: graphComputed,
  user: userComputed,
  graphDetail: graphDetailComputed,
  about: aboutComputed,
  expertDetail: expertDetailComputed,
  classification: classificationComputed,
  invacations: invacationsComputed,
  favorites: favoritesComputed,
  category: categoryComputed,
};

export default computed;
