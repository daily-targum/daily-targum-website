import dynamic from "next/dynamic";

export * from "./Analytics";
export * from "./SEO";
export * from "./Navbar";
export * from "./Section";
export * from "./Footer";
export * from "./Divider";
export * from "./Text";
export * from "./NewsSlider";
export * from "./ImageSlider";
export * from "./ArticleImage";
export * from "./Newsletter";
export * from "./Button";
export * from "./Byline";
export * from "./FlatList";
export * from "./ActivityIndicator";
export * from "./CardRow";
export * from "./AspectRatioView";
export * from "./Card";
export * from "./Carousel";
export * from "./Grid/web";
export * from "./PodcastPlayerBar";
export * from "./Table";
export * from "./NextNProgress";
export * from "./Banner";
export * from "./HTML";
export * from "./Video";
export * from "./Page";
export * from "./Image";
export * from "./TagBar";
export * from "./Link";
export * from "./Modal";
export * from "./Sticky";
export * from "./SkipNav";
export * from "./ResetTabIndex";
export * from "./AccessibilityFix";
export * from "./Donate";
export * from "./Semantic";
export * from "./Search";
export * from "./HighlightText";
export * from "./GlobalCSS";
export * from "./Card2";
export * from "./ScrollFix";
export * from "./LoadMoreButton";
export * from "./RelatedArticles";
export * from "./Flytedigita";
export * from "./Modal2";
export * from "./DonateModal";
export * from "./NewLogo";
export * from "./ImageFigure";

export const Ad = dynamic(() => import("./Ad"), {
  ssr: false,
});

export const AdSense = dynamic(() => import("./AdSense"), {
  ssr: false,
});

export const ScrollLock = dynamic(() => import("./ScrollLock"), {
  ssr: false,
});
