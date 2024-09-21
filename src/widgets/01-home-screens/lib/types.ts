export enum HomeScreensEnum {
  HERO = "hero",
  ADVANTAGES = "advantages",
  ABOUT = "about",
  SOLUTIONS = "solutions",
  ECOSYSTEM = "ecosystem",
  COMMUNITY = "community",
  BLOG = "blog",
  TRAILBLAZER = "trailblazer",
}

export enum HomeApiKeys {
  BLOG = "blogs-list",
}

export interface IHomeAdvantage {
  id: string;
  icon: string;
  title: string;
  text: string;
  colors: {
    icon: string;
    text: string;
    background: string;
  };
}

export interface IHomeAbout {
  icon: string;
  title: string;
  text: string;
}

export interface IHomeSolution {
  title: string;
  extraTitle: string;
  title_short: string;
  text: string;
  icon: string;
  iconLottie: string;
}
