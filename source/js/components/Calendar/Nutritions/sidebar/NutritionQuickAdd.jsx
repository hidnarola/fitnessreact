import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../../assets/svg/star.svg';

const NutritionQuickAdd = props => {
  const { quickTab, recentMeals, addTodayMeals, handleChangeQuickTab } = props;
  return (
    <React.Fragment>
      <div className="blue_right_sidebar">
        <h2 className="h2_head_one">Quick Add</h2>
        <div className="tabs tabs-active ">
          <div
            className={quickTab === '#recentmeals' ? 'tab active' : 'tab'}
            id="recentmeals"
          >
            <a
              href="#recentMeals"
              onClick={() => handleChangeQuickTab('#recentmeals')}
            >
              Recent
            </a>
          </div>
          <div
            className={quickTab === '#favrioutmeals' ? 'tab active' : 'tab'}
            id="favrioutmeals"
          >
            <a
              href="#favrioutmeals"
              onClick={() => handleChangeQuickTab('#favrioutmeals')}
            >
              Favourite
            </a>
          </div>
        </div>
        <div className={'tab-content'}>
          <div className="recent-ingredient">
            <Scrollbars autoHide>
              {quickTab === '#recentmeals' && <ul></ul>}
              {quickTab === '#favrioutmeals' && (
                <ul>
                  {recentMeals &&
                    recentMeals.length > 0 &&
                    recentMeals.map((v, id) => (
                      <li key={id} onClick={e => addTodayMeals(v)}>
                        <span className={'star_one active'}>
                          <Star />
                        </span>
                        <h3>{v.title}</h3>
                        <div className="add_drag">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>
                      </li>
                    ))}
                  {/* <li>
                    Pasta
                    <div className="add_drag">
                      <i className="icon-control_point" /> Click to Add
                    </div>
                  </li> */}
                </ul>
              )}
            </Scrollbars>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionQuickAdd;
