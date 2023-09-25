import { useNavigate } from 'react-router-dom';
import {DirectoryItemContainer, BackgroundImage, Body} from './directory-item.styles.jsx'

const DirectoryItem = ({category})=> {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          < BackgroundImage 
            imageurl= {imageUrl} //passing the imageUrl as a prop to the styled-component
          />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;