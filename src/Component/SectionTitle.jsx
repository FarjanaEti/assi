const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-purple-600 text-center md:w-4/12 ">
            <p className="lg:text-3xl mb-2">--- {subHeading} ---</p>
            <h3 className="lg:text-2xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;