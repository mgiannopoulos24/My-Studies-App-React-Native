declare module '*.yaml' {
  const content: Record<string, any>;
  export default content;
}

declare module '*.yml' {
  const content: Record<string, any>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}