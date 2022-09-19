import {
  DataTableStoreProvider,
  DataTableState,
} from './DataTableStoreProvider';

type ColumnsDefinitionType = {
  field: string;
  headerName?: string;
  type?: 'number' | 'text' | 'date' | 'tel';
};

export interface DateTableProps {
  className?: string;
  columns: ColumnsDefinitionType[];
}

interface DataTableProps {
  rows: DataTableState<unknown>['rows'];
}

export function DataTable(props: DataTableProps) {
  const { rows } = props;
  return (
    <DataTableStoreProvider rows={rows}>
      <WrappedTable />
    </DataTableStoreProvider>
  );
}

function WrappedTable() {
  return <div className="Table">Table</div>;
}
