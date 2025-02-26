import { FormTemplateBuilder } from '@/components/pages/FormTemplateBuilder';
import { PrivateRoute } from '@/components/routes';

const CreateTemplatePage = () => {
    return (
        <PrivateRoute>
            <FormTemplateBuilder />;
        </PrivateRoute>
    );
};

export default CreateTemplatePage;
