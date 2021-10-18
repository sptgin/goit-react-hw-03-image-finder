import Loader from 'react-loader-spinner';

function SpinnerLoader() {
  return (
    <Loader
      className="SpinnerLoader"
      type="Watch"
      color="#303f9f"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
}

export default SpinnerLoader;
