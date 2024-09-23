import BrownTheme from './BrownTheme';
import DefaultTheme from './DefaultTheme';
import GrayTheme from './GrayTheme';
import GreenTheme from './GreenTheme';
import OrangeTheme from './OrangeTheme';
import StandardDartTheme from './StandardDarkTheme';
import StandardLightTheme from './StandardLightTheme';
import TealTheme from './TealTheme';

const themeList = [];

themeList.push({ name: "default", theme: DefaultTheme });
themeList.push({ name: "brown", theme: BrownTheme });
themeList.push({ name: "gray", theme: GrayTheme });
themeList.push({ name: "green", theme: GreenTheme });
themeList.push({ name: "orange", theme: OrangeTheme });
themeList.push({ name: "dark-standard", theme: StandardDartTheme });
themeList.push({ name: "light-standard", theme: StandardLightTheme });
themeList.push({ name: "teal", theme: TealTheme });

export default themeList;