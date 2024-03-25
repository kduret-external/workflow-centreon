<?php

/*
 * Copyright 2005 - 2023 Centreon (https://www.centreon.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * For more information : contact@centreon.com
 *
 */

declare(strict_types=1);

namespace Tests\Core\Broker\Infrastructure\API\UpdateStreamConnectorFile;

use Core\Application\Common\UseCase\AbstractPresenter;
use Core\Application\Common\UseCase\ResponseStatusInterface;
use Core\Broker\Application\UseCase\UpdateStreamConnectorFile\UpdateStreamConnectorFilePresenterInterface;
use Core\Broker\Application\UseCase\UpdateStreamConnectorFile\UpdateStreamConnectorFileResponse;

class UpdateStreamConnectorFilePresenterStub extends AbstractPresenter implements UpdateStreamConnectorFilePresenterInterface
{
    public ResponseStatusInterface|UpdateStreamConnectorFileResponse $response;

    public function presentResponse(ResponseStatusInterface|UpdateStreamConnectorFileResponse $response): void
    {
        $this->response = $response;
    }
}
