import FilterOrigin from "./filter-origin";

type FilterControlsCategoryProps = {
    setFilterOrigin: (origin: string) => void;
}

const FilterControlsCategory = (props: FilterControlsCategoryProps) => {
    const { setFilterOrigin } = props;

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <h3 className="mb-4 text-3xl font-semibold">Filtros</h3>
            
            {/* Aquí mandamos llamar al filtro de origen que ya creaste */}
            <FilterOrigin setFilterOrigin={setFilterOrigin} />
            
            {/* En el futuro, aquí debajo agregaremos el FilterTaste (filtro de sabor) */}
        </div>
    );
}

export default FilterControlsCategory;