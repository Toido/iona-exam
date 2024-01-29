import { Col, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { ISelectedBreed } from 'src/types/AppTypes';

interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ISelectedBreed[];
}

const Dropdown = (props: DropdownProps) => {
  const { value, options, onChange } = props;
  return (
    <FormGroup>
      <FormLabel>Breed</FormLabel>
      <Col md={3} sm={6} xs={12}>
        <FormSelect value={value} onChange={onChange} data-testid="dropdown">
          {options.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </FormSelect>
      </Col>
    </FormGroup>
  );
};

export default Dropdown;
