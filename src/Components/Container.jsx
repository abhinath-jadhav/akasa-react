const Container = ({ children, className, width }) => {
 

  return (
    <div
      className={`flex justify-center mx-auto z-20 max-w-[1400px] ${className} `}
    >
      {children}
    </div>
  );
};

export default Container;
