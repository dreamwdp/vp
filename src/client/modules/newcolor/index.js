import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import NewColor from './components/NewColor';

const mapStateToProps = (
  { user },
  { location: { pathname, search }, history }
) => {
  const defaultColors = search.match(/[a-f0-9]{24}/);
  const showUpload = pathname === '/extract';
  const isAuth = user.get('isAuth');
  return {
    showUpload,
    isAuth,
    onRedirect: history.push,
    defaultColors: defaultColors && defaultColors[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd(colorValue) {
      const cl0 = colorValue.map((v) => {
        return v.substr(1);
      });

      const ac = createAction('color/addNew');
      const color = cl0.join('#');
      if (color.length === 27) {
        dispatch(
          ac({
            color,
          })
        );
      } else {
        console.error('illegal color value size'); // eslint-disable-line no-console
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewColor);
