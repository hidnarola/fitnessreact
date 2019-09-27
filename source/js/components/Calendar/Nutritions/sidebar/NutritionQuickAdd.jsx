import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../../assets/svg/star.svg';
import Collapse from 'react-bootstrap/lib/Collapse';
import { routeCodes } from '../../../../constants/routes';
import { Link } from 'react-router-dom';

class NutritionQuickAdd extends Component {
  state = {
    favOpen: true,
    recentOpen: false,
  };
  render() {
    const {
      quickTab,
      recentMeals,
      addTodayMeals,
      handleChangeQuickTab,
    } = this.props;
    const { favOpen, recentOpen } = this.state;
    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Food</h2>
            <Link
              to={routeCodes.NUTRITION_ADD}
              className="btn btn-plus-right bg-white ml-auto"
            >
              <FontAwesomeIcon icon="plus" />
            </Link>
          </div>
          <div className="quick-tabs">
            <div
              className={quickTab === '#recentmeals' ? 'tab active' : 'tab'}
              id="recentmeals"
            >
              <a
                href="#recentMeals"
                onClick={() => handleChangeQuickTab('#recentmeals')}
              >
                Food
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
                Meals
              </a>
            </div>
          </div>
          <div className={'tab-content'}>
            <div className="recent-ingredient">
              <Scrollbars autoHide>
                {quickTab === '#recentmeals' && <ul></ul>}
                {quickTab === '#favrioutmeals' && (
                  <ul>
                    <li
                      className="display-dropdown align-items-center"
                      onClick={() => this.setState({ favOpen: !favOpen })}
                      aria-controls="favourites-collapse"
                      aria-expanded={favOpen}
                    >
                      <h3>Favourites</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="sort-down" />
                      </div>
                    </li>
                    <Collapse in={favOpen}>
                      <div id="favourites-collapse">
                        <li>
                          <span className={'star_one active'}>
                            <Star />
                          </span>
                          <h3>Apple</h3>
                          <div className="add_drag">
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>
                        </li>
                        <li>
                          <span className={'star_one active'}>
                            <Star />
                          </span>
                          <h3>Banana</h3>
                          <div className="add_drag">
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>
                        </li>
                      </div>
                    </Collapse>
                    <li
                      className="display-dropdown"
                      onClick={() => this.setState({ recentOpen: !recentOpen })}
                      aria-controls="recent-collapse"
                      aria-expanded={recentOpen}
                    >
                      <h3>Recent</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="sort-down" />
                      </div>
                    </li>
                    <Collapse in={recentOpen}>
                      <div id="recent-collapse">
                        {recentMeals &&
                          recentMeals.length > 0 &&
                          recentMeals.map((v, id) => (
                            <li key={id} onClick={e => addTodayMeals(v)}>
                              <span className={'star_one active'}>
                                <Star />
                              </span>
                              <h3>{v.title}</h3>
                              {/* <div className="add_drag">
                                <FontAwesomeIcon icon="plus-circle" />
                              </div> */}
                            </li>
                          ))}
                      </div>
                    </Collapse>
                    <li className="p-0">
                      <div className="custom-select width-100-per">
                        <select>
                          <option value="0" style={{ color: '#fff' }}>
                            For Demo:
                          </option>
                          <option value="1">Apple</option>
                          <option value="2">Banana</option>
                          <option value="3">Orange</option>
                          <option value="4">Egg</option>
                          <option value="5">Onions</option>
                          <option value="6">Pizza</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                )}
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName('custom-select');
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName('select')[0];
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement('DIV');
      a.setAttribute('class', 'select-selected');
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement('DIV');
      b.setAttribute('class', 'select-items select-hide');
      for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
        c = document.createElement('DIV');
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener('click', function(e) {
          /*when an item is clicked, update the original select box,
        and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName('same-as-selected');
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener('click', function(e) {
        /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
    }
    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
  except the current select box:*/
      var x,
        y,
        i,
        arrNo = [];
      x = document.getElementsByClassName('select-items');
      y = document.getElementsByClassName('select-selected');
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove('select-arrow-active');
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add('select-hide');
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
    document.addEventListener('click', closeAllSelect);
  }
}

export default NutritionQuickAdd;
